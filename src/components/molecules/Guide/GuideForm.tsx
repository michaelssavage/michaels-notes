import { mapsLinkCache, resolveMapsCoordsFn } from "@/api/resolve-map.api";
import { Group } from "@/components/atoms/Group";
import { Label } from "@/components/form/Label";
import { FormArea } from "@/components/form/molecules/FormArea";
import { FormSelect } from "@/components/form/molecules/FormSelect";
import { FormText } from "@/components/form/molecules/FormText";
import { MapIcon } from "@/components/icons/Map";
import { SaveIcon } from "@/components/icons/Save";
import { Anchor } from "@/components/molecules/Anchor";
import { Button } from "@/components/molecules/Button";
import FileUpload from "@/components/molecules/FileUpload/FileUpload";
import { withForm } from "@/context/FormProvider";
import { slugify } from "@/lib/utils";
import { Form } from "@/styles/routes/guide.styled";
import {
  GUIDE_TAGS,
  GUIDE_TYPES,
  GuideTableItem,
  GuideTag,
  GuideType,
} from "@/types/Guide";
import { css } from "@emotion/react";
import { ChangeEvent, ClipboardEvent, FormEvent } from "react";

const defaultValues: GuideTableItem = {
  title: "",
  id: "",
  description: "",
  link: "",
  location: "",
  coordinates: { lat: 0, lng: 0 },
  price: "",
  type: "place",
  image: "",
  tags: [],
};

const GuideForm = withForm({
  defaultValues,
  render: function Render({ form }) {
    const options: Array<{ value: GuideType; label: string }> = Object.values(
      GUIDE_TYPES
    ).map((type) => ({
      value: type,
      label: type,
    }));

    const tagOptions: Array<{ value: GuideTag; label: string }> = Object.values(
      GUIDE_TAGS
    ).map((tag) => ({
      value: tag,
      label: tag,
    }));

    const handleChangeCoordinates = (e: ChangeEvent<HTMLInputElement>) => {
      const [lat, lng] = e.target.value.split(",").map(Number);
      form.setFieldValue("coordinates", { lat, lng });
    };

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue("title", e.target.value);
      form.setFieldValue("id", slugify(e.target.value));
    };

    const handlePasteLink = async (e: ClipboardEvent<HTMLInputElement>) => {
      const link = e.clipboardData.getData("text");

      if (mapsLinkCache.has(link)) {
        const cached = mapsLinkCache.get(link);
        if (cached) {
          form.setFieldValue("coordinates", cached);
        }
        return;
      }

      if (link.includes("maps") || link.includes("goo.gl")) {
        const coords = await resolveMapsCoordsFn({ data: { link } });
        mapsLinkCache.set(link, coords);

        if (coords) {
          form.setFieldValue("coordinates", coords);
        }
      }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await form.handleSubmit();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <form.Field name="title">
          {(field) => (
            <FormText
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Enter the title"
              onBlur={field.handleBlur}
              onChange={handleChangeTitle}
              meta={field.state.meta}
            />
          )}
        </form.Field>

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
              placeholder="Enter a link to the activity or place"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              meta={field.state.meta}
            />
          )}
        </form.Field>

        <form.Field name="location">
          {(field) => (
            <Group direction="row" gap="0.5rem" align="flex-start">
              <FormText
                id={field.name}
                name={field.name}
                label={
                  <Group direction="row" gap="0.5rem" align="flex-start">
                    <Label id={field.name} text="Location" />
                    <Anchor
                      link={field.state.value}
                      text="Open in Maps"
                      icon={<MapIcon />}
                      isExternal
                      style={css`
                        flex: 1;
                        display: flex;
                        justify-content: flex-end;
                        gap: 0.5rem;
                        text-decoration: none;
                      `}
                      variant="header"
                    />
                  </Group>
                }
                value={field.state.value}
                placeholder="Enter the Google Maps link"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onPaste={handlePasteLink}
                meta={field.state.meta}
              />
            </Group>
          )}
        </form.Field>

        <Group direction="row" gap="0.5rem">
          <form.Field name="coordinates">
            {(field) => (
              <FormText
                id={field.name}
                name={field.name}
                value={`${field.state.value?.lat ?? 0}, ${field.state.value?.lng ?? 0}`}
                placeholder="Enter the coordinates"
                onBlur={field.handleBlur}
                onChange={handleChangeCoordinates}
                meta={field.state.meta}
              />
            )}
          </form.Field>

          <form.Field name="price">
            {(field) => (
              <FormText
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Enter the price"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                meta={field.state.meta}
              />
            )}
          </form.Field>
        </Group>

        <Group direction="row" gap="0.5rem">
          <form.Field name="tags">
            {(field) => (
              <FormSelect<GuideTag>
                id={field.name}
                name={field.name}
                meta={field.state.meta}
                options={tagOptions}
                placeholder="Select the tags"
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value as GuideTag[])}
                value={field.state.value}
                multiSelect
              />
            )}
          </form.Field>

          <form.Field name="type">
            {(field) => (
              <FormSelect<GuideType>
                id={field.name}
                name={field.name}
                meta={field.state.meta}
                options={options}
                placeholder="Select the type"
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value as GuideType)}
                value={field.state.value}
              />
            )}
          </form.Field>
        </Group>

        <form.Field name="image">
          {(field) => (
            <Group direction="column" gap="0.5rem" width="100%">
              <Label id="file-upload" text="Image" />
              <Group direction="row" gap="0.5rem" width="100%">
                <FileUpload
                  name={field.name}
                  value={field.state.value ? [field.state.value] : []}
                  maxFiles={1}
                  showCount={false}
                  onChange={(files) => {
                    field.handleChange(files[0] ?? "");
                  }}
                />
              </Group>
            </Group>
          )}
        </form.Field>

        <Group direction="row" gap="0.5rem" justify="flex-end">
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

export default GuideForm;
