export function extractCategories(categories) {
    const trimmedCategories = categories.split('>').map(category => category.trim())
    return trimmedCategories.filter(category => category !== '')
}
