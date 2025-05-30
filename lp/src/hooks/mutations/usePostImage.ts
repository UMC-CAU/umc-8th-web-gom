import { useMutation } from '@tanstack/react-query'
import { postImage } from '../../apis/common'

export default function usePostImage() {
    return useMutation({
        mutationFn: postImage,
        onError: (error) => {
            console.error('서버에 이미지 업로드 실패:', error)
        },
    })
}
