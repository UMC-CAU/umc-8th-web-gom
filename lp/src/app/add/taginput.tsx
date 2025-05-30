import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { NewLpFormFields } from './modal'
import { X } from 'lucide-react'

interface TagInputProps {
    tags: string[]
    setValue: UseFormSetValue<NewLpFormFields>
}

const TagInput = ({ tags, setValue }: TagInputProps) => {
    const [tagInput, setTagInput] = useState('')

    const addTag = (newTag: string) => {
        if (!tags.includes(newTag)) {
            setValue('tags', [...tags, newTag])
        }
        setTagInput('')
    }

    const removeTag = (tag: string) => {
        setValue(
            'tags',
            tags.filter((t) => t !== tag)
        )
    }

    return (
        <div className="w-full flex flex-col space-y-2">
            {/* input section */}
            <div className="flex flex-row space-x-2">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag(tagInput.trim())
                        }
                    }}
                    placeholder="tag"
                    className="flex-1 input-box"
                />
                <button
                    type="button"
                    onClick={() => addTag(tagInput.trim())}
                    className="px-2 btn border-none hover:bg-gray-200"
                >
                    추가
                </button>
            </div>

            {/* added tags section */}
            <div className="flex flex-row flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <div
                        key={idx}
                        className="flex flex-row items-center w-fit px-2 py-1 space-x-3 bg-gray-300 rounded-2xl"
                    >
                        <div className="text-gray-700">{tag}</div>
                        <button onClick={() => removeTag(tag)} className="cursor-pointer">
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagInput
