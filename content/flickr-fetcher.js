var FlickrFetcher;

FlickrFetcher = {
    /**
     * Convert Flickr photo object to a url
     * @param photoObj
     * @returns {string}
     */
    photoObjToURL: function (photoObj) {
        return [
            'https://farm', photoObj.farm,
            '.staticflickr.com/', photoObj.server,
            '/', photoObj.id,
            '_', photoObj.secret,
            '_b.jpg'
        ].join('');
    },

    /**
     * Transform Flickr photo object to object with url and title
     * @param photoObj
     * @return {object}
     */
    transformPhotoObj: function (photoObj) {
        return {
            title: photoObj.title,
            url: FlickrFetcher.photoObjToURL(photoObj)
        };
    },

    /**
     * Get data from the Flickr API
     * @param apiKey - Flickr API key
     * @param fetch - request function
     * @return {Promise}
     */
    fetchFlickrData: function (apiKey, fetch) {
        if ((!fetch) && (typeof jQuery !== 'undefined')) {
            fetch = jQuery.getJSON.bind(jQuery);
        }

        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
            + apiKey + '&text=pugs&format=json&nojsoncallback=1';

        return fetch(url);
    },

    /**
     * Get photos from Flickr API
     * @param apiKey - Flickr API key
     * @param fetch - request function
     * @return {Promise}
     */
    fetchPhotos: function (apiKey, fetch) {
        return FlickrFetcher.fetchFlickrData(apiKey, fetch).then(function (data) {
            return data.photos.photo.map(FlickrFetcher.transformPhotoObj);
        });
    }
};

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = FlickrFetcher;
}
