<template>
    <div class="message-item outgoing-message">
        <div class="message-avatar">
            <figure class="avatar">
                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" class="rounded-circle" alt="Avatar">
            </figure>
        </div>
        <div>
            <div class="message-content">{{ message }}</div>
            <div class="time">{{ time }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MessageSent',
    props: ['message', 'time']
}
</script>