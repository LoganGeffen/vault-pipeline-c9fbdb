const video = document.querySelector('#walkthrough');
const chapters = [...document.querySelectorAll('.chapters a')];

function seekFromAddress(play = false) {
  const match = location.hash.match(/^#t=(\d+(?:\.\d+)?)$/);
  if (!match) return;
  video.currentTime = Math.min(Number(match[1]), video.duration);
  if (play) {
    video.scrollIntoView({ block: 'start' });
    video.play().catch(() => video.focus());
  }
}

chapters.forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState(null, '', link.hash);
    if (video.readyState) seekFromAddress(true);
    else video.addEventListener('loadedmetadata', () => seekFromAddress(true), { once: true });
  });
});

video.addEventListener('loadedmetadata', () => seekFromAddress());
if (video.readyState) seekFromAddress();
window.addEventListener('hashchange', () => {
  if (video.readyState) seekFromAddress();
});
video.addEventListener('timeupdate', () => {
  const current = chapters.findLast(link => Number(link.dataset.start) <= video.currentTime);
  chapters.forEach(link => {
    if (link === current) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
});

const captionTrack = video.textTracks[0];
const captionTitle = document.querySelector('#caption-title');
const captionBody = document.querySelector('#caption-body');
captionTrack.mode = 'hidden';
captionTrack.addEventListener('cuechange', () => {
  const cue = captionTrack.activeCues[0];
  const [title = '', ...body] = cue ? cue.text.split('\n') : [];
  captionTitle.textContent = title;
  captionBody.textContent = body.join(' ');
});

const player = document.querySelector('#player');
const fullscreen = document.querySelector('#fullscreen');
fullscreen.hidden = !document.fullscreenEnabled;
fullscreen.addEventListener('click', async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await player.requestFullscreen();
});
document.addEventListener('fullscreenchange', () => {
  fullscreen.textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
});
