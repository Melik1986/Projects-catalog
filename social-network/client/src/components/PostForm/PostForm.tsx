import {FC} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query"; // ← исправлен импорт
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';

import {createPost} from "../../api/Post.ts";
import {Button} from '../Button';
import {FormField} from '../FormField';
import './PostForm.css';

export interface IPostFormProps {
}

const CreatePostSchema = z.object({
  text: z.string().min(10, "Текст поста должен быть не менее 10 символов"),
});

type CreatePostForm = z.infer<typeof CreatePostSchema>;

export const PostForm: FC<IPostFormProps> = () => {
    const queryClient = useQueryClient();

    const {
      register,
      handleSubmit,
    formState: {errors},
      reset,
    } = useForm<CreatePostForm>({
      resolver: zodResolver(CreatePostSchema),
    });


    const createPostMutation = useMutation(
      {
        mutationFn: createPost,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['posts']});
          reset(); //  очистить форму после успешного создания
        }
      });

    return (
      <form
        className="post-form"
        onSubmit={handleSubmit(({text}) => {
        createPostMutation.mutate(text);
      })}
      >
        <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea
          className="post-form__input"
          {...register('text')}
        />
        </FormField>

        <Button
          type="submit"
          title="Опубликовать"
          isLoading={createPostMutation.isPending}
        />
      </form>
    );
  };