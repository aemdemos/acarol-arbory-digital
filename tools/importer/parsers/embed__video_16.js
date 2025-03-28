export default function parse(element, { document }) {
    // Extract video URL from the video element
    const video = element.querySelector('video');
    const videoURL = video ? video.src : '';

    // Use dynamic extraction for the video poster if it exists
    const videoPoster = video ? video.getAttribute('poster') : '';

    // Create the header row matching the example structure exactly
    const headerRow = ['Embed'];

    // Create the content row combining the poster image (if available) and the plain URL
    const contentRow = [];
    if (videoPoster) {
        const image = document.createElement('img');
        image.src = videoPoster;
        image.alt = 'Video Poster';
        contentRow.push(image);
        contentRow.push(document.createElement('br'));
    }
    if (videoURL) {
        contentRow.push(videoURL); // Add plain text URL
    }

    // Create the table with the helper function
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the new table
    element.replaceWith(table);
}