from pathlib import Path
import numpy as np
import cv2 as cv
import numpy as np
import os
import tensorflow as tf
from PIL import Image
from math import ceil

BASE_DIR = Path(__file__).resolve().parent.parent


def load_images_from_folder(folder_img):
    images = {}
    l_img = os.listdir(folder_img)
    for filename in l_img:
        img = cv.imread(os.path.join(folder_img, filename))
        if img is not None:
            images[filename] = img
    return images


def check_crop_black(img):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    ret, thresh = cv.threshold(
        gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
    contours, _ = cv.findContours(
        thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    if len(contours) == 1:
        contours_black, _ = cv.findContours(
            thresh.copy(), cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
        cnt = contours_black[-2]
        x, y, w, h = cv.boundingRect(cnt)
        x1 = ceil(x + (w * 0.1))
        y1 = ceil(y + (h * 0.235))
        w1 = ceil(0.8 * w)
        h1 = ceil(0.53 * h)
        new_img = img[y1:y1 + h1, x1:x1 + w1]
        return new_img
    else:
        return img


def prep_cnt(org_img):
    final_img = check_crop_black(org_img)
    gray = cv.cvtColor(final_img, cv.COLOR_BGR2GRAY)
    # blurred = cv.bilateralFilter(gray,5,50,55)
    ret, thresh = cv.threshold(
        gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
    contours, _ = cv.findContours(
        thresh.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    # sorted_contours= sorted(contours, key=cv.contourArea, reverse= True)
    return final_img, contours


def crop_img(org_img, contours_img, id_img):
    seg_img = {}
    rect_img = {}
    H, W = org_img.shape[:2]
    min_area = 0.0015 * H * W
    j = 0
    for (i, c) in enumerate(contours_img):
        x, y, w, h = cv.boundingRect(c)
        mask = np.zeros(org_img.shape[:2], np.uint8)
        if cv.contourArea(c) >= min_area:
            cv.drawContours(mask, [c], -1, 255, -1)
            dst = cv.bitwise_and(org_img, org_img, mask=mask)
            cropped_contour = dst[y:y + h, x:x + w]
            pil_img = Image.fromarray(cropped_contour)
            width, height = pil_img.size
            if width == height:
                pre_img = pil_img
            elif width > height:
                result = Image.new(pil_img.mode, (width, width), (0, 0, 0))
                result.paste(pil_img, (0, (width - height) // 2))
                pre_img = result
            else:
                result = Image.new(pil_img.mode, (height, height), (0, 0, 0))
                result.paste(pil_img, ((height - width) // 2, 0))
                pre_img = result
            pre_img = np.array(pre_img.resize((64, 64))).astype('float32')
            pre_img /= 255
            seg_img[id_img + str(j)] = np.expand_dims(pre_img, axis=0)
            rect_img[id_img + str(j)] = [x, y, w, h]
            j = j + 1
    return seg_img, rect_img


def expand2square(img, background_color):
    pil_img = Image.fromarray(img)
    width, height = pil_img.size
    if width == height:
        return pil_img
    elif width > height:
        result = Image.new(pil_img.mode, (width, width), background_color)
        result.paste(pil_img, (0, (width - height) // 2))
        return result
    else:
        result = Image.new(pil_img.mode, (height, height), background_color)
        result.paste(pil_img, ((height - width) // 2, 0))
        return result


def img_processing(img_file):
    # img_file = load_images_from_folder(dir_img)
    rect_case = {}
    seg_case = {}
    for ID in img_file:
        org_img, cnt_img = prep_cnt(img_file[ID])
        img_file[ID] = org_img
        seg_case[ID], rect_case[ID] = crop_img(img_file[ID], cnt_img, ID)
    return img_file, seg_case, rect_case


def load_model_pred(directory):
    # model = load_model(directory)
    # model.save(directory)
    # del model
    # model.load_weights(directory)
    model = tf.keras.models.load_model(directory)
    return model


def predict_model(model, image_cell):
    prob = model.predict(image_cell)
    return prob[0][0]


def draw_rec(img, rect):
    copy_img = np.copy(img)
    # scale = 2000/copy_img.shape[0]
    # copy_img = cv.resize(copy_img, None, fx = scale, fy = scale)
    line_size = ceil(copy_img.shape[0] / 1000)
    font_size = copy_img.shape[0] / 2000
    i = 0
    for cell in rect:
        i = i + 1
        x = rect[cell][2][0]
        y = rect[cell][2][1]
        w = rect[cell][2][2]
        h = rect[cell][2][3]
        spe = []
        for top in rect[cell][1]:
            if top == 0:
                spe.append('falciparum')
            elif top == 1:
                spe.append('malariae')
            elif top == 2:
                spe.append('vivax')
            elif top == 3:
                spe.append('ovale')
            elif top == 4:
                spe.append('knowlesi')
            elif top == 5:
                spe.append('ring')
        specie = str(spe)
        cv.rectangle(copy_img, (x, y), (x + w, y + h), (0, 0, 255), line_size)
        cv.putText(copy_img, str(i), (x, y - 10),
                   cv.FONT_HERSHEY_SIMPLEX, font_size, (0, 0, 255), line_size)
        cv.putText(copy_img, specie, (x, y + h + 10),
                   cv.FONT_HERSHEY_SIMPLEX, font_size, (255, 0, 0), line_size)
        final_result_image = Image.fromarray(copy_img)
    return final_result_image


def all_predict(all_org_image_file):
    all_prob = {}
    infected_cellimg = {}
    result_img = {}
    infect_prob = {}
    # species = ['falciparum', 'malariae', 'vivax', 'ovale', 'knowlesi', 'ring']
    # C:\Users\CPE\webapp-backend\backend\case\model\model_falciparum.
    print(BASE_DIR)
    model_falciparum = load_model_pred(
        os.path.join(BASE_DIR, "model", "model_falciparum.h5"))
    model_falciparum = load_model_pred(
        os.path.join(BASE_DIR, "model", "model_falciparum.h5"))
    model_malariae = load_model_pred(
        os.path.join(BASE_DIR, "model", "malariae_model.h5"))
    model_vivax = load_model_pred(
        os.path.join(BASE_DIR, "model", "vivax_model_final_1.h5"))
    model_ovale = load_model_pred(
        os.path.join(BASE_DIR, "model", "ovale_model.h5"))
    model_knowlesi = load_model_pred(
        os.path.join(BASE_DIR, "model", "knowlesi_model_final_1.h5"))
    model_ring = load_model_pred(
        os.path.join(BASE_DIR, "model", "ring_model.h5"))

    org_img, croped_all_img, rect_all_img = img_processing(all_org_image_file)
    for img_name in croped_all_img:
        all_prob[img_name] = {}
        infect_prob[img_name] = {}
        infected_cellimg[img_name] = {}
        i = 0
        for img_cell in croped_all_img[img_name]:
            prep_img = croped_all_img[img_name][img_cell]
            prob_each_spe = []
            prob_each_spe.append(predict_model(model_falciparum, prep_img))
            prob_each_spe.append(predict_model(model_malariae, prep_img))
            prob_each_spe.append(predict_model(model_vivax, prep_img))
            prob_each_spe.append(predict_model(model_ovale, prep_img))
            prob_each_spe.append(predict_model(model_knowlesi, prep_img))
            prob_each_spe.append(predict_model(model_ring, prep_img))
            all_prob[img_name][img_cell] = prob_each_spe
            if any(p > 0.5 for p in prob_each_spe):
                i = i + 1
                cell_name = img_name[:-4] + '-' + str(i) + '.png'
                top_prob_species = [spe for spe, prob in enumerate(
                    prob_each_spe) if prob == max(prob_each_spe)]
                infected_cellimg[img_name][cell_name] = []
                cell_img = (croped_all_img[img_name][img_cell].reshape(
                    (64, 64, 3)) * 255).astype(np.uint8)
                cell_img = Image.fromarray(cell_img)
                infected_cellimg[img_name][cell_name].append(cell_img)
                infected_cellimg[img_name][cell_name].append(top_prob_species)
                infected_cellimg[img_name][cell_name].append(
                    rect_all_img[img_name][img_cell])
                infect_prob[img_name][cell_name] = all_prob[img_name][img_cell]
        # draw rectangle on result image
        if img_name in infected_cellimg:
            result_img[img_name] = draw_rec(
                org_img[img_name], infected_cellimg[img_name])
        else:
            result_img[img_name] = np.copy(org_img[img_name])
    return all_prob, infect_prob, infected_cellimg, result_img


def percentage_spe(infect_cell):
    l_top_prob = []
    for img_name in infect_cell:
        for img_cell in infect_cell[img_name]:
            l_top_prob = l_top_prob + infect_cell[img_name][img_cell][1]
    if len(l_top_prob) == 0:
        spe = []
        percent_each_spe = [0, 0, 0, 0, 0, 0]
    elif all(x == 5 for x in l_top_prob):
        spe = ['ring']
        percent_each_spe = [0, 0, 0, 0, 0, 100]
    else:
        Pf = (l_top_prob.count(0) /
              len([s for s in l_top_prob if s != 5])) * 100
        Pm = (l_top_prob.count(1) /
              len([s for s in l_top_prob if s != 5])) * 100
        Pv = (l_top_prob.count(2) /
              len([s for s in l_top_prob if s != 5])) * 100
        Po = (l_top_prob.count(3) /
              len([s for s in l_top_prob if s != 5])) * 100
        Pk = (l_top_prob.count(4) /
              len([s for s in l_top_prob if s != 5])) * 100
        ring = (l_top_prob.count(5) / len(l_top_prob)) * 100
        percent_each_spe = [Pf, Pm, Pv, Po, Pk, ring]
        spe_num = [spe for spe, pc in enumerate(
            percent_each_spe) if pc == max(percent_each_spe[:5])]
        spe = []
        for top in spe_num:
            if top == 0:
                spe.append('falciparum')
            elif top == 1:
                spe.append('malariae')
            elif top == 2:
                spe.append('vivax')
            elif top == 3:
                spe.append('ovale')
            elif top == 4:
                spe.append('knowlesi')
    return percent_each_spe, spe
