import Vue from 'vue'
import App from './App'
import router from './router/route'
import axios from 'axios'
import createStore from './store/index'

Vue.prototype.$http = axios

export default function createApp() {
	const store = createStore()
	const app = new Vue({
		data () {
			return {
				timer: null
			}
		},
		router,
		store,
		render: createElement => createElement(App),
		mounted () {
			this.$nextTick(() => {
				this.remSet()
				window.onresize = () => {
					if (!this.timer) {
						this.timer = setTimeout(() => {
							this.remSet()
							this.timer = null
						}, 220);
					}
				}
			})
		},
		methods: {
			remSet () {
				document.getElementsByTagName('html')[0].style.fontSize = 100 * window.innerWidth / 375 + 'px';
			}
		}
	})
	return { app, store, router }
}

module.exports = createApp