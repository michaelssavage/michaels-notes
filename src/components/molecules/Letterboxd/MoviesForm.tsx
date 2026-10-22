import { Group } from "@/components/atoms/Group";
import { TextInput } from "@/components/form/TextInput";
import { ArrowDown } from "@/components/icons/ArrowDown";
import { ArrowUpIcon } from "@/components/icons/ArrowUp";
import { SaveIcon } from "@/components/icons/Save";
import { XIcon } from "@/components/icons/X";
import { Button } from "@/components/molecules/Button";
import { Drawer } from "@/components/molecules/Drawer";
import { withForm } from "@/context/FormProvider";
import { type IMovie } from "@/types/Movie";
import { css } from "@emotion/react";
import { FormEvent } from "react";
import {
  DrawerContent,
  DrawerHeader,
  IconButton,
  MoviesTable,
  TableArea,
} from "./MoviesForm.styled";

export type MovieInput = Omit<IMovie, "id">;

export const defaultMovie: MovieInput = {
  title: "",
  year: "",
  status: "",
  image_url: "",
  link_url: "",
};

const columns: Array<{
  key: keyof MovieInput;
  name: string;
  placeholder: string;
}> = [
  { key: "title", name: "Title", placeholder: "Title" },
  { key: "year", name: "Year", placeholder: "2001" },
  { key: "status", name: "Status", placeholder: "Status" },
  { key: "image_url", name: "Image URL", placeholder: "Poster URL" },
  { key: "link_url", name: "Link", placeholder: "Letterboxd URL" },
];

const MoviesForm = withForm({
  defaultValues: { movies: [] as MovieInput[] },
  props: {} as { isOpen: boolean; onClose: () => void },
  render: function Render({ form, isOpen, onClose }) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await form.handleSubmit();
    };

    return (
      <Drawer
        title="Edit favourite movies"
        description="Edit, reorder, add or remove the movies in the Letterboxd carousel."
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <DrawerContent onSubmit={handleSubmit}>
          <DrawerHeader>
            <h2>Edit favourite movies</h2>
            <IconButton type="button" aria-label="Close" onClick={onClose}>
              <XIcon />
            </IconButton>
          </DrawerHeader>

          <form.Field name="movies" mode="array">
            {(moviesField) => {
              const movies = moviesField.state.value;

              return (
                <>
                  {/* no-drag so selecting text and scrolling don't move the drawer */}
                  <TableArea data-vaul-no-drag>
                    <MoviesTable>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          {columns.map(({ key, name }) => (
                            <th key={key} scope="col" id={`movies-col-${key}`}>
                              {name}
                            </th>
                          ))}
                          <th scope="col">
                            <span className="visually-hidden">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {movies.map((movie, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {columns.map(({ key, placeholder }) => (
                              <td key={key}>
                                <form.Field name={`movies[${index}].${key}`}>
                                  {(field) => (
                                    <TextInput
                                      id={`${key}-${index}`}
                                      name={`${key}-${index}`}
                                      value={field.state.value}
                                      placeholder={placeholder}
                                      onBlur={field.handleBlur}
                                      onChange={(e) =>
                                        field.handleChange(e.target.value)
                                      }
                                    />
                                  )}
                                </form.Field>
                              </td>
                            ))}
                            <td>
                              <Group direction="row" gap="0.25rem">
                                <IconButton
                                  type="button"
                                  aria-label={`Move ${movie.title || `movie ${index + 1}`} up`}
                                  disabled={index === 0}
                                  onClick={() =>
                                    moviesField.moveValue(index, index - 1)
                                  }
                                >
                                  <ArrowUpIcon size={18} />
                                </IconButton>
                                <IconButton
                                  type="button"
                                  aria-label={`Move ${movie.title || `movie ${index + 1}`} down`}
                                  disabled={index === movies.length - 1}
                                  onClick={() =>
                                    moviesField.moveValue(index, index + 1)
                                  }
                                >
                                  <ArrowDown size={18} />
                                </IconButton>
                                <IconButton
                                  type="button"
                                  aria-label={`Remove ${movie.title || `movie ${index + 1}`}`}
                                  disabled={movies.length === 1}
                                  onClick={() => moviesField.removeValue(index)}
                                >
                                  <XIcon size={18} />
                                </IconButton>
                              </Group>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </MoviesTable>
                  </TableArea>

                  <Group direction="row" gap="0.5rem" justify="space-between">
                    <Button
                      text="Add movie"
                      variant="secondary"
                      onClick={() => moviesField.pushValue({ ...defaultMovie })}
                    />
                    <Group direction="row" gap="0.5rem">
                      <Button
                        text="Cancel"
                        variant="secondary"
                        onClick={onClose}
                      />
                      <form.Subscribe selector={(state) => state.isSubmitting}>
                        {(isSubmitting) => (
                          <Button
                            type="submit"
                            text="Save"
                            icon={<SaveIcon />}
                            disabled={isSubmitting}
                            ariaBusy={isSubmitting}
                            styles={css`
                              svg {
                                stroke: var(--color-white);
                              }
                            `}
                          />
                        )}
                      </form.Subscribe>
                    </Group>
                  </Group>
                </>
              );
            }}
          </form.Field>
        </DrawerContent>
      </Drawer>
    );
  },
});

export default MoviesForm;
