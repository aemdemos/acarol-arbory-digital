export default function parse(element, { document }) {
  // Check for required HTML structure and extract relevant content dynamically
  const slides = element.querySelectorAll('.swiper-slide a');
  const headingElement = element.querySelector('.elementor-heading-title');
  const descriptionElement = element.querySelector('.elementor-widget-text-editor p');
  const podcastButton = element.querySelector('.elementor-button');
  const youtubeIcon = element.querySelector('.fab.fa-youtube');
  const spotifyIcon = element.querySelector('.fab.fa-spotify');
  const appleIcon = element.querySelector('.fab.fa-apple');

  // Handle edge cases for missing data
  const heading = headingElement ? headingElement.textContent.trim() : 'Heading not found';
  const description = descriptionElement ? descriptionElement.textContent.trim() : 'Description not found';
  const podcastLink = podcastButton ? podcastButton.href : null;
  const youtubeLink = youtubeIcon && youtubeIcon.parentElement ? youtubeIcon.parentElement.href : null;
  const spotifyLink = spotifyIcon && spotifyIcon.parentElement ? spotifyIcon.parentElement.href : null;
  const appleLink = appleIcon && appleIcon.parentElement ? appleIcon.parentElement.href : null;

  // Create structured table data dynamically
  const headerRow = ['Table (striped & bordered)'];

  const rows = Array.from(slides).map(slide => {
    const title = slide.getAttribute('data-elementor-lightbox-title') || 'Title not found';
    const videoUrl = slide.getAttribute('data-elementor-lightbox-video') || 'URL not found';

    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = 'Watch';

    return [title, link];
  });

  // Add podcast links dynamically, wrapping them in <a> tags
  if (youtubeLink) {
    const youtubeAnchor = document.createElement('a');
    youtubeAnchor.href = youtubeLink;
    youtubeAnchor.textContent = youtubeLink;
    rows.push(['Youtube', youtubeAnchor]);
  }

  if (spotifyLink) {
    const spotifyAnchor = document.createElement('a');
    spotifyAnchor.href = spotifyLink;
    spotifyAnchor.textContent = spotifyLink;
    rows.push(['Spotify', spotifyAnchor]);
  }

  if (appleLink) {
    const appleAnchor = document.createElement('a');
    appleAnchor.href = appleLink;
    appleAnchor.textContent = appleLink;
    rows.push(['Apple Podcasts', appleAnchor]);
  }

  if (podcastLink) {
    const podcastAnchor = document.createElement('a');
    podcastAnchor.href = podcastLink;
    podcastAnchor.textContent = podcastLink;
    rows.push(['Podcast Home', podcastAnchor]);
  }

  // Combine header and rows into table data
  const tableData = [headerRow, ...rows];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}