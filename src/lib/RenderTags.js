import React from "react";
export default function renderTags (tags) {
    let parsedTags = [];

    try {
        parsedTags = Array?.isArray(tags) ? tags : JSON.parse(tags);
    } catch {
        parsedTags = [];
    }

    return parsedTags.map((tag, index) => (
        <span key={index} className="badge bg-primary me-1">
            {tag}
        </span>
    ));
};
