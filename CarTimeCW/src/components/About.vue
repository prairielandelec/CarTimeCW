<template>
    <Tabs default-value="about" class="w-[500px]">
        <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="about">
                About
            </TabsTrigger>
            <TabsTrigger value="issues">
                Issues
            </TabsTrigger>
            <TabsTrigger value="architecture">
                Architecture
            </TabsTrigger>
        </TabsList>
        <TabsContent value="about">
            <Card>
                <CardHeader>
                    <CardTitle>About This Site</CardTitle>
                </CardHeader>
                <CardContent>

                    <body>
                        This is a simple Static Single Page Application that fills a gap I had when I was going through
                        the LWCO
                        training process.
                        There was no good option to listen to a block of characters up to a certain lesson during the
                        commute to
                        work which is when
                        I have the most time for learning. This page allows a user to listen to all the characters up to
                        a
                        certain lesson with speech
                        synthesis played after each character. Not the fastest way to learn and does not help with
                        callsign copy
                        or blocks but helps
                        with initial character recognition training. I may update this at some point in the future to
                        take in
                        blocks of characters if
                        that appears to be useful further along in my CW training.
                    </body>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="issues">
            <Card>
                <CardHeader>
                    <CardTitle>Known Issues</CardTitle>
                </CardHeader>
                <CardContent>

                    <body>
                        There is a bug in the underlying Morse Code library that is used where user settings are not
                        adopted on
                        init and only take effect
                        after the first character is played. To get around this for now, this site will play a single
                        "e"
                        character before each set but will
                        not have the speech synthesis API play for that character. Think of it as a "start tone" until
                        it is
                        fixed in the underlying library
                    </body>
                    <br>
                    <body>
                        Settings currently do not persist due to my lack of understanding about the EU and Californian
                        cookie
                        laws. For now settings will just not
                        persist and you will need to put in your settings each time. If I can get clarification about
                        whether or
                        not user interaction/consent is required
                        for settings/preferences I will update this tool to store the settings in localStorage or a
                        persistent
                        pinia store or something.
                    </body>
                    <br>
                    <body>
                        If you find any other issues please file an Issue on the project's GitHub page and I will get
                        to it ASAP. I built this project for myself but fully intend for other hams to use it.
                    </body>
                    <a style="font-weight: bold;" href="https://github.com/prairielandelec/CarTimeCW">https://github.com/prairielandelec/CarTimeCW</a>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="architecture">
            <Card>
                <CardHeader>
                    <CardTitle>Site Architecture</CardTitle>
                </CardHeader>
                <CardContent>

                    <body>
                        This website is built using VueJS 3 with the Composition API and TypeScript. Part of the function of this project
                        was to work on web dev in the modern era and get more acquainted with vue as it seems to be a growing reactivity framework
                        and with the composition api it is really nice to work with
                    </body>
                    <br>
                    <body>
                        The audio is entirely done with the Web Audio API so nothing needs to be downloaded or installed. It should just work with
                        most modern browsers and is intended primarily for mobile use (I use it in the car).
                    </body>
                    <br>
                    <body>
                        This project relies on the Morse Player package by Andrew Bunker which is inspired by the underlying library used by LWCO.
                        Andrew's Project can be found here:
                    </body>
                    <a style="font-weight: bold;" href="https://github.com/numinos1/morse-player">https://github.com/numinos1/morse-player</a>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
</script>