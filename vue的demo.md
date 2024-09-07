```
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>


<script>
        new Vue({
            el: '#app',
            data: {  
                isOK:true,
                username:'',
                phone:'',
                address:'',
                payway:1,
            },
            computed: {
            },
            methods: {
                submitForm(){
                    if(this.username.length>0 && this.phone.length>0 && this.address.length>0){
                        location.reload();
                    }else{
                        this.isOK=false;
                        return;
                    }
                }
            },
        });

</script>


```