import { Style } from './../.nuxt/components.d';
import {createVuetify, useTheme} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp =>{
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            themes: {
                dark: {
                    colors: {
                        "primary": "#FF55DD",
                        "primary2": "#E54CC7",
                        "primary3": "#BF3FA6",
                        "primary4": "#401537",
                        "secondary": "#30CCC6",
                        "secondary2": "#2AB2AD",
                        "secondary3": "#218C88",
                        "secondary4": "#124C4A",
                        "offwhite": "#eee",
                        "black": "#101010",
                        "offblack": "#212121",
                        "t4": "#424242"
                    }
                }
            },
            defaultTheme: 'dark'
            
        }
        
    })
    nuxtApp.vueApp.use(vuetify)
})