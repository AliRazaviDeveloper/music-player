const track_name = document.querySelector('#track_name')
const track_artist = document.querySelector('#track_artist')
const about_music_list = document.querySelector('#about_music_list')
const image_track = document.querySelector('#image_track')
const play_music = document.querySelector('#play_music')
const pause_music = document.querySelector('#pause_music')
const current_time = document.querySelector('#current_time')
const duration = document.querySelector('#duration')
const seek_slider = document.querySelector('#seek_slider')
const volume_slider = document.querySelector('#volume_slider')
let curr_track = document.createElement('audio')
let updateTimer
const music_list = [
  {
    name: 'Lal',
    artistName: 'Yas',
    image: './assets/image/music-1.jpeg',
    url: './assets/music/Yas - Lal.mp3',
  },
  {
    name: 'Bim',
    artistName: 'Yas',
    image: './assets/image/music-3.jpeg',
    url: './assets/music/Yas - Beem (320).mp3',
  },
  {
    name: 'Sarkoob',
    artistName: 'Yas',
    image: './assets/image/music-2.jpeg',
    url: './assets/music/22 Yas - Sarkoob.mp3',
  },
]

let indexTrack = 0

loadTrack(indexTrack)

function loadTrack(index) {
  clearInterval(updateTimer)

  reset()
  curr_track.src = music_list[index].url
  curr_track.load()
  track_name.textContent = music_list[index].name
  track_artist.textContent = music_list[index].artistName
  about_music_list.innerHTML = `
  موزیک های پخش شده ${indexTrack + 1} از ${music_list.length}
  `
  image_track.src = music_list[index].image
  updateTimer = setInterval(setUpdate, 1000)
  curr_track.addEventListener('ended', nextMusic)
}

function playMusic() {
  curr_track.play()
  play_music.classList.add('hidden')
  pause_music.classList.remove('hidden')
}

function nextMusic() {
  indexTrack++
  if (indexTrack > music_list.length - 1) {
    indexTrack = 0
  }
  loadTrack(indexTrack)
  playMusic()
}

function prevMusic() {
  indexTrack--
  if (indexTrack < 0) {
    indexTrack = music_list.length - 1
  }
  loadTrack(indexTrack)
  playMusic()
}

function pauseMusic() {
  curr_track.pause()
  play_music.classList.remove('hidden')
  pause_music.classList.add('hidden')
}

function reset() {
  current_time.textContent = '00:00'
  duration.textContent = '00:00'
  seek_slider.value = 0
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100)
  console.log(seekto)
  curr_track.currentTime = seekto
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100
}

function setUpdate() {
  let seekPosition = 0
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration)
    seek_slider.value = seekPosition
    let currentMinutes = Math.floor(curr_track.currentTime / 60)
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    )
    let durationMinutes = Math.floor(curr_track.duration / 60)
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60)
    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes
    }

    current_time.textContent = currentMinutes + ':' + currentSeconds
    duration.textContent = durationMinutes + ':' + durationMinutes
  }
}
