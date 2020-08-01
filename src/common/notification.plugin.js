import NotificationList from "../components/NotificationList";
import Vue from "vue";

let events = new Vue({ render: h => h(NotificationList) });

const notify = {
  install(Vue) {
    Vue.component("NotificationList", NotificationList);

    // event emitters
    const notify = notification => events.$emit("add-notification", notification);
    const clear = () => events.$emit("clear-notification")
    const remove = notification => events.$emit("remove-notification", notification);

    Vue.prototype.$notify = notify
    Vue.prototype.$notify.clear = clear;
    Vue.prototype.$notify.remove = remove
  }
};

export default { notify, events };
