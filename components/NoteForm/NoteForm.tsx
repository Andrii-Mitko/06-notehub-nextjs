import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

import type { NoteTag } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema: Yup.ObjectSchema<FormValues> = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500).default(""),
  tag: Yup.mixed<NoteTag>().oneOf(TAGS).required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        mutation.mutate(values);
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label>Title</label>
          <Field name="title" className={css.input} />
          <ErrorMessage name="title" component="span" />
        </div>

        <div className={css.formGroup}>
          <label>Content</label>
          <Field as="textarea" name="content" className={css.textarea} />
          <ErrorMessage name="content" component="span" />
        </div>

        <div className={css.formGroup}>
          <label>Tag</label>
          <Field as="select" name="tag" className={css.select}>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" component="span" />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={mutation.isPending}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
