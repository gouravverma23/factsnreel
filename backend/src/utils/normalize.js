const toStringId = (value) => String(value ?? Date.now());

const normalizeStringArray = (value) => {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value === 'string') {
        return value.split(',').map((item) => item.trim()).filter(Boolean);
    }

    return [];
};

const normalizeSubPosts = (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.map((item, index) => ({
        ...item,
        id: toStringId(item?.id ?? `sub-${Date.now()}-${index}`),
        topic: normalizeStringArray(item?.topic),
        subtopics: normalizeStringArray(item?.subtopics),
        content: Array.isArray(item?.content) ? item.content : [],
        references: Array.isArray(item?.references) ? item.references : [],
    }));
};

const normalizePostPayload = (payload = {}, fallback = {}) => ({
    id: toStringId(payload.id ?? fallback.id ?? Date.now()),
    title: String(payload.title ?? fallback.title ?? '').trim(),
    image: String(payload.image ?? fallback.image ?? '').trim(),
    description: String(payload.description ?? fallback.description ?? '').trim(),
    topic: normalizeStringArray(payload.topic ?? fallback.topic),
    subtopics: normalizeStringArray(payload.subtopics ?? fallback.subtopics),
    type: String(payload.type ?? fallback.type ?? 'post').trim(),
    content: Array.isArray(payload.content) ? payload.content : (fallback.content || []),
    references: Array.isArray(payload.references) ? payload.references : (fallback.references || []),
    subPosts: normalizeSubPosts(payload.subPosts ?? fallback.subPosts),
});

const normalizeFactPayload = (payload = {}, fallback = {}) => ({
    id: toStringId(payload.id ?? fallback.id ?? Date.now()),
    image: String(payload.image ?? fallback.image ?? '').trim(),
    fact: String(payload.fact ?? fallback.fact ?? '').trim(),
    description: String(payload.description ?? fallback.description ?? '').trim(),
    list: normalizeStringArray(payload.list ?? fallback.list),
    listName: String(payload.listName ?? fallback.listName ?? '').trim(),
    reference: String(payload.reference ?? fallback.reference ?? '').trim(),
    credit: String(payload.credit ?? fallback.credit ?? '').trim(),
    readMoreLink: String(payload.readMoreLink ?? fallback.readMoreLink ?? '').trim(),
    buttonText: String(payload.buttonText ?? fallback.buttonText ?? '').trim(),
});

module.exports = {
    normalizeFactPayload,
    normalizePostPayload,
};
