// export const fetchPhotos = () => {
//     // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
//     // and simply retrieve a list of all images with that tag.
//     // the version property is used for cache bust (lists are cached by the CDN for 1 minute)
//     // *************************************************************************
//     // Note that this practice is DISCOURAGED in production code and is here
//     // for demonstration purposes only
//     // *************************************************************************
//     const options = {
//         cloudName: "famsproj",
//         format: 'json',
//         type: 'list',
//         version: Math.ceil(new Date().getTime() / 1000),
//     };

//     const urlPath = url('fams', options);

//     return fetch(urlPath)
//         .then(res => res.text())
//         .then(text => (text ? JSON.parse(text).resources : []));
// };