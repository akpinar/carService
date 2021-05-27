import Toastr from './Toastr'
import '@/assets/toastr.css'
import 'animate.css/animate.css'

const CxltToastr = {
    install: function (Vue, options) {
        if (!options) {
            options = {}
        }
        let showedToastrs = []

        function showToast(obj, type) {
            const ToastrComponent = Vue.extend(Toastr)
            var propsData = Object.assign(options, obj, {
                type: type
            })
            let component = new ToastrComponent({
                el: document.createElement('div'),
                propsData
            })

            showedToastrs.push(component)

            return component
        }

        function adaptedMessage(obj) {
            if (typeof obj !== 'object' && typeof obj !== 'function') obj = { message: obj.toString() }
            return obj
        }

        Vue.prototype.$toast = {
            success(obj) {
                return showToast(adaptedMessage(obj), 'success')
            },
            info(obj) {
                return showToast(adaptedMessage(obj), 'info')
            },
            warn(obj) {
                return showToast(adaptedMessage(obj), 'warning')
            },
            error(obj) {
                return showToast(adaptedMessage(obj), 'error')
            },
            removeAll() {
                showedToastrs.forEach(c => {
                    c.hideToastr()
                })
                showedToastrs = []
            }
        }
    }
}

export default CxltToastr
