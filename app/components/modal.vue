<template>
    <div class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{content}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="$emit('main-button-clicked')">{{mainButtonText}}</button>
                        <button type="button" class="btn btn-secondary" @click="$emit('secondary-button-clicked')" data-dismiss="modal">{{secondaryButtonText}}</button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        name: 'Modal',
        props: {
            title: String, 
            content: String,
            mainButtonText: String,
            secondaryButtonText: String
        }
    }
</script>