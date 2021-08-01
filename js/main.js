const $video = document.querySelector("#video");
const $videoOverlay = document.querySelector(".player-overlay");
const $play = document.querySelector("#play");
const $pause = document.querySelector("#pause");
const $backward = document.querySelector("#backward");
const $forward = document.querySelector("#forward");
const $progress = document.querySelector("#progress");
const $mute = document.querySelector("#mute");
const $unmute = document.querySelector("#unmute");

const onUploadVideoTime = (isBackward = false) => {
  const currentTime = Number($video.currentTime.toFixed());

  $video.currentTime = isBackward ? currentTime - 10 : currentTime + 10;
};

const onToggleOverlay = () => {
  $videoOverlay.classList.toggle("show");
};

const onToggleMuteButton = (isPause = false) => {
  const isMuted = $video.muted;

  $mute.hidden = !isMuted || isPause;
  $unmute.hidden = isMuted || isPause;
};

const onToggleHidden = (isPause = false) => {
  $play.hidden = !isPause;
  $pause.hidden = isPause;
  $backward.hidden = isPause;
  $forward.hidden = isPause;
  $progress.hidden = isPause;
  $mute.hidden = isPause;
  onToggleMuteButton(isPause);
};

const onVideoLoaded = () => {
  $progress.max = $video.duration;
};

const onVideoTimeUpdate = () => {
  $progress.value = $video.currentTime;
};

const onPlay = (e) => {
  e.stopPropagation();
  $video.play();
  onToggleOverlay();
  onToggleHidden();
};

const onPause = (e) => {
  e.stopPropagation();
  $video.pause();
  onToggleOverlay();
  onToggleHidden(true);
};

const onRewind = (e) => {
  $video.currentTime = 0;
  onPause(e);
  $video.load();
};

const onBackward = (e) => {
  e.stopPropagation();
  onUploadVideoTime(true);
};

const onForward = (e) => {
  e.stopPropagation();
  onUploadVideoTime();
};

const onProgressChange = () => {
  $video.currentTime = $progress.value;
};

const onToggleMute = () => {
  const isMuted = $video.muted;

  $video.muted = !isMuted;
  onToggleMuteButton();
};

$video.addEventListener("loadedmetadata", onVideoLoaded);
$video.addEventListener("timeupdate", onVideoTimeUpdate);
$video.addEventListener("ended", onRewind);
$play.addEventListener("click", onPlay);
$pause.addEventListener("click", onPause);
$backward.addEventListener("click", onBackward);
$forward.addEventListener("click", onForward);
$progress.addEventListener("input", onProgressChange);
$mute.addEventListener("click", onToggleMute);
$unmute.addEventListener("click", onToggleMute);
