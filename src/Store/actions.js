import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TITLE,
    TABLE_CHANGE_TEXT,
    TABLE_RESIZE,
    UPDATE_DATE,
} from "@/Store/types";

// Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data,
    }
}

export function tableChangeText(data) {
    return {
        type: TABLE_CHANGE_TEXT,
        data,
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data,
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data,
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data,
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE,
    }
}