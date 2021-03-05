// const input = document.querySelector('input[name="price"]')
// input.addEventListener('keydown', function(event) {
    
//     setTimeout(function() {
//         let { value } = event.target

//         //first time passing through "replace and NumberFormat"
//         //1 will transform in -> R$1,00 real
//         //second time
//         //R$1,00 will transform in -> 100
//         //to fix the problem you've gotta do this: R$1,00 -> 100 / 100
//         //this will return number 1 again
//         //another exemple: R$180,23 -> 18023 / 100 will return 180.23
//         value = value.replace(/\D/g, "")

//         value = Intl.NumberFormat('pt-BR', {
//             style: 'currency',
//             currency: 'BRL'
//         }).format(value/100)

//         event.target.value = value
//     }, 1)
// })


const Mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}



const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    handleFileInput(event) {
        const { files: fileList } = event.target
       
        if(PhotosUpload.hasLimit(event)) return true
        

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)

            }

            reader.readAsDataURL(file)
        })
    },
    hasLimit(event) {
        const { uploadLimit } = PhotosUpload
        const { files: fileList } = event.target

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} imagens`)
            event.preventDefault()

            return true
        }

        return false
    },
    getContainer(image) {
        const div = document.createElement('div')

        div.classList.add('photo')

        div.onclick = () => alert('Remover foto')

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'

        return button
    }

}