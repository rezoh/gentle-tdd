var PhotoLister;

PhotoLister = {
    /**
     * Render photo to a html list item
     * @param {object} photo
     * @return {string}
     */
    photoToListItem: function (photo) {
        return [
            '<li><figure><img src="',
            photo.url, '" alt=""/>',
            '<figcaption>',
            photo.title,
            '</figcaption></figure></li>'
        ].join('');
    },

    /**
     * Render photos list to a HTML
     * @param photos
     * @return {string}
     */
    photoListToHTML: function (photos) {
        return [
            '<ul>',
            photos.map(PhotoLister.photoToListItem).join(''),
            '</ul>'
        ].join('');
    },

    /**
     * Append photos list HTML into an element
     * @param $
     * @param selector
     * @param list
     * @return {*|jQuery}
     */
    addPhotosToElement: function ($, selector, list) {
        return $(selector).append(list);
    }
};

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = PhotoLister;
}
