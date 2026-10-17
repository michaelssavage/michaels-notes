import { Group } from "@/components/atoms/Group";
import { FormArea } from "@/components/form/molecules/FormArea";
import { FormSelect } from "@/components/form/molecules/FormSelect";
import { FormText } from "@/components/form/molecules/FormText";
import { SaveIcon } from "@/components/icons/Save";
import { Button } from "@/components/molecules/Button";
import { withForm } from "@/context/FormProvider";
import { slugify } from "@/lib/utils";
import { Form } from "@/styles/routes/guide.styled";
import { Gift, GiftCategory, giftCategoryOptions } from "@/types/Gift";
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent } from "react";

export const defaultGift: Gift = {
  id: "",
  name: "",
  category: "tech",
  link: "",
  image: "",
  price: "",
  description: "",
};

const GiftForm = withForm({
  defaultValues: defaultGift,
  props: {} as { isEditing?: boolean; onDelete?: () => void },
  render: function Render({ form, isEditing, onDelete }) {
    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue("name", e.target.value);
      // the id is the primary key, so keep it stable once the gift exists
      if (!isEditing) form.setFieldValue("id", slugify(e.target.value));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await form.handleSubmit();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <form.Field name="name">
          {(field) => (
            <FormText
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Enter the name"
              onBlur={field.handleBlur}
              onChange={handleChangeName}
              meta={field.state.meta}
            />
          )}
        </form.Field>

        {!isEditing && (
          <form.Field name="id">
            {(field) => (
              <FormText
                id={field.name}
                name="ID / slug"
                value={field.state.value}
                placeholder="Enter the ID"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                meta={field.state.meta}
              />
            )}
          </form.Field>
        )}

        <form.Field name="description">
          {(field) => (
            <FormArea
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Enter the description"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              meta={field.state.meta}
            />
          )}
        </form.Field>

        <form.Field name="link">
          {(field) => (
            <FormText
              id={field.name}
              name="Link / Website"
              value={field.state.value}
              placeholder="Enter a link to the gift"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              meta={field.state.meta}
            />
          )}
        </form.Field>

        <form.Field name="image">
          {(field) => (
            <FormText
              id={field.name}
              name="Image URL"
              value={field.state.value}
              placeholder="Enter an image URL"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              meta={field.state.meta}
            />
          )}
        </form.Field>

        <Group direction="row" gap="0.5rem">
          <form.Field name="price">
            {(field) => (
              <FormText
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="e.g. From €35"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                meta={field.state.meta}
              />
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <FormSelect<GiftCategory>
                id={field.name}
                name={field.name}
                meta={field.state.meta}
                options={giftCategoryOptions}
                placeholder="Select the category"
                onChange={(value) => field.handleChange(value as GiftCategory)}
                value={field.state.value}
              />
            )}
          </form.Field>
        </Group>

        <Group direction="row" gap="0.5rem" justify="flex-end">
          {onDelete && (
            <Button
              type="button"
              text="Delete"
              variant="secondary"
              onClick={onDelete}
            />
          )}
          <Button
            type="submit"
            text="Save"
            icon={<SaveIcon />}
            styles={css`
              svg {
                stroke: var(--color-white);
              }
            `}
          />
        </Group>
      </Form>
    );
  },
});

export default GiftForm;
