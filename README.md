# CarTimeCW
A simple Single Page Web App to help practice CW in the car by using WebAudio Speech Synthesis to say the letters in english after the Morse Code plays.
I was using [Learn CW Online](https://lcwo.net/) to learn Morse Code (or Constant Wave aka CW) but wanted the ability to practice in the car. There are many options for prerecorded tapes to practice once you have mastered all of the Alphabet, but no good solutions to learn the letters in the car. LWCO and other methods have you write down the characters on a paper while they are being played and then you check them against the right answer later, not really an option in a moving vehicle. What I really wanted was to hear a letter at the speed I was practicing at, and then hear a voice repeat the letter in english after some time had elapsed. That way I could learn the letters while I commuted to work.

This is a small applet written in Vue because that is the framework I have used the most and have found fairly straightforward and easy to build with. One could probably take just the Type Script from this and make it much much smaller, but I could not be bothered to learn how to do reactivity natively in Javascript/Typescript and I am not a webdev so this is what I did.

Should work in pretty much any modern browser except for Opera Android (See the [WebAudio Compatibility Matrix](https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis#browser_compatibility)). Should probably build it in to a real iOS/Android app at some point so I can leverage the respective voice assistants and Carplay/Android Auto for a more seamless experience.

## Backend

### Morse Player
[@numinos1](https://github.com/numinos1) has written a great schedule based Morse Code generator that made this project possible. It pulls inspiration from [Learn CW Online](https://lcwo.net/) which I was already using to learn but did not have the narrated playback functionality I was looking for. The Morse Player repo has some interesting reading in it about the scheduler system it uses and the Audio Scheduler idea it was inspired by.

https://github.com/numinos1/morse-player/tree/main


### WebAudio Speech Synthesis
The WebAudio API is the core of this project. Some time ago someone realized that we did not need to reinvent the wheel every time we wanted to play some audio in a browser and so the WebAudio framework was created and is now included in most browsers. It is pretty straightforward to use and allowed me to not have to actually do anything difficult.

https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis

## Frontend

### Vue
I have used Vue for a few projects after using it a bit at work and the Vite build system coupled with the reactivity system of Vue made me much more comfortable building web apps. There are probably "better" or more performant frameworks out there but I am not a webdev so I cannot be bothered to compare them or learn a new one.

### Shadcn Vue
A port of Shadcn to vue. I do not know much about frontend component libraries but having fully portable webuis seemed like a decent idea so I have used this a couple of times. It seems to work well for my needs.

https://github.com/unovue/shadcn-vue

