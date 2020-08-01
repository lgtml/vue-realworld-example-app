<template>
  <div class="notifications">
    <div
      v-for="(notification, index) in notifications"
      :key="notification.id"
      class="notification"
      :class="notification.type"
    >
      <h5>{{ capitalize(notification.title) }}</h5>
      {{ notification.content }}
      <button @click="remove(index)" class="btn-close">Close</button>
    </div>
    <button v-if="notifications.length" @click="clear" class="btn-clear">
      Clear all
    </button>
  </div>
</template>

<script>
import NotificationPlugin from "@/common/notification.plugin";

const id = (i => () => i++)(0) // generates sequential ids

export default {
  name: "NotificationList",
  data: {
    notifications: []
  },
  created() {
    const events = NotificationPlugin.events;

    // event handlers
    events.$on("add-notification", this.add)
    events.$on("clear-notifications", () => {
      console.loger('[NOTIFICATIONS] Clear')
      this.notifications = [];
    })
  },
  methods: {
    add(notification) {
      notification = typeof notification == 'string' ? { content: notification } : ( notification.id ? notification : { id: id(), ...notification } )

      if (notification.clear) this.clear()

      console.loger('[NOTIFICATIONS] Add: ', notification)
      this.notifications.push(notification);
    },
    remove(index) {
      console.loger('[NOTIFICATIONS] Remove: ', this.notifications[index])
      this.notifications.splice(index, 1)
    },
    clear() {
      console.loger('[NOTIFICATIONS] Clear')
      this.notifications = [];
    },
    capitalize(string) {
      return 
        string ? string.toUpperCase() : "";
    }
  }
};
</script>