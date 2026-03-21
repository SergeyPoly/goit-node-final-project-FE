import { useCallback, useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { cn } from '@/shared/lib/clsx';
import { ImageManager } from '@/shared/ui/ImageManager';
import { TextField } from '@/shared/ui/TextField';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { IngredientChip } from '@/shared/ui/IngredientChip';

import { useCategoriesQuery } from '@/features/categories/model/use-categories-query';
import { useIngredientsStoreSync } from '@/features/ingredients/model/use-ingredients-store-sync';
import { useAreasStoreSync } from '@/features/areas/model/use-areas-store-sync';

import { useIngredientsStore } from '@/entities/ingredient/model/use-ingredients-store';
import { useAreasStore } from '@/entities/area/model/use-areas-store';
import { createRecipe } from '@/entities/recipe/api/recipes';

const COOK_TIME_STEP = 1;
const COOK_TIME_MIN = 1;
const COOK_TIME_MAX = 120;

const INITIAL_VALUES = {
  recipeName: '',
  description: '',
  category: '',
  cookTime: 40,
  area: '',
  selectedIngredient: '',
  measure: '',
  recipePreparation: '',
  ingredientsList: [],
  recipeImage: null,
};

const validationSchema = Yup.object({
  recipeName: Yup.string().required('Recipe name is required'),
  description: Yup.string().required('Description is required').max(200, 'Max 200 symbols'),
  category: Yup.string().required('Category is required'),
  cookTime: Yup.number().required().min(1),
  area: Yup.string().required('Area is required'),
  recipePreparation: Yup.string().required('Preparation is required').min(10, 'Min 10 symbols').max(1000),
  ingredientsList: Yup.array().min(1, 'Add at least one ingredient'),
  recipeImage: Yup.mixed().required('Recipe photo is required'),
});

const toOptionsByName = (items) =>
  (Array.isArray(items) ? items : [])
    .map((x) => ({ value: x?.name ?? '', label: x?.name ?? '' }))
    .filter((o) => o.value);

export const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [recipeImagePreview, setRecipeImagePreview] = useState(null);

  useIngredientsStoreSync();
  useAreasStoreSync();

  const { data: categoriesData } = useCategoriesQuery();
  const ingredients = useIngredientsStore((s) => s.ingredients);
  const areas = useAreasStore((s) => s.areas);

  const categoryOptions = useMemo(() => {
    const cats = Array.isArray(categoriesData)
      ? categoriesData
      : (categoriesData?.categories ?? []);
    return cats.map((c) => ({ value: c.name, label: c.name }));
  }, [categoriesData]);

  const ingredientOptions = useMemo(() => toOptionsByName(ingredients), [ingredients]);
  const areaOptions = useMemo(() => toOptionsByName(areas), [areas]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('thumb', values.recipeImage);
    formData.append('title', values.recipeName.trim());
    formData.append('description', values.description.trim());
    formData.append('category', values.category);
    formData.append('area', values.area);
    formData.append('instructions', values.recipePreparation.trim());
    formData.append('time', String(values.cookTime));
    formData.append(
      'ingredients',
      JSON.stringify(
        values.ingredientsList.map(({ ingredientId, measure }) => ({ ingredientId, measure }))
      )
    );

    try {
      const { recipe } = await createRecipe(formData);
      toast.success('Recipe created!');
      navigate(`/recipe/${recipe?.id}`);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Error';
      toast.error(errorMsg);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        validateForm,
        handleReset,
        isSubmitting,
      }) => {
        useEffect(() => {
          if (!values.recipeImage) {
            setRecipeImagePreview(null);
            return;
          }
          const url = URL.createObjectURL(values.recipeImage);
          setRecipeImagePreview(url);
          return () => URL.revokeObjectURL(url);
        }, [values.recipeImage]);

        const handleAddIngredient = () => {
          if (!values.selectedIngredient || !values.measure) return;
          const ingredient = ingredients?.find((i) => i.name === values.selectedIngredient);
          if (!ingredient) return;

          const newList = [
            ...values.ingredientsList,
            {
              id: crypto.randomUUID(),
              ingredientId: ingredient.id,
              name: ingredient.name,
              measure: values.measure.trim(),
              image: ingredient?.img,
            },
          ];
          setFieldValue('ingredientsList', newList);
          setFieldValue('selectedIngredient', '');
          setFieldValue('measure', '');
        };

        const handleRemoveIngredient = useCallback(
          (id) => {
            const newList = values.ingredientsList.filter((item) => item.id !== id);
            setFieldValue('ingredientsList', newList);
            setFieldTouched('ingredientsList', true);
            validateForm({ ...values, ingredientsList: newList });
          },
          [values, setFieldValue, setFieldTouched, validateForm]
        );

        const handleClearForm = useCallback(() => {
          handleReset();
          setRecipeImagePreview(null);
        }, [handleReset]);

        return (
          <Form className="desktop:flex-row desktop:gap-20 flex flex-col gap-10">
            <div
              className={cn(
                'desktop:h-[400px] desktop:w-[551px] desktop:shrink-0 transition-colors',
                touched.recipeImage &&
                  errors.recipeImage &&
                  'rounded-[1.875rem] shadow-[inset_0_0_0_2px_var(--color-error)]'
              )}
            >
              <ImageManager
                variant="recipe"
                image={recipeImagePreview}
                onChange={(file) => setFieldValue('recipeImage', file)}
              />
              {touched.recipeImage && errors.recipeImage && (
                <p className="mt-1 text-sm text-red-600">{errors.recipeImage}</p>
              )}
            </div>

            <div className="desktop:min-w-0 desktop:max-w-[649px] desktop:flex-1 flex flex-col gap-20">
              <div className="tablet:gap-10 flex flex-col gap-8">
                {/* Name + Description */}
                <section className="tablet:gap-10 flex flex-col gap-8">
                  <div>
                    <div
                      className={cn(
                        'flex flex-col gap-1 border-b pb-4 transition-colors',
                        touched.recipeName && errors.recipeName ? 'border-error' : 'border-grey'
                      )}
                    >
                      <input
                        id="recipeName"
                        name="recipeName"
                        type="text"
                        placeholder="The name of the recipe"
                        value={values.recipeName}
                        onChange={(e) => setFieldValue('recipeName', e.target.value)}
                        onBlur={() => setFieldTouched('recipeName')}
                        aria-label="Recipe name"
                        className={cn(
                          'tablet:text-base placeholder:text-grey w-full bg-transparent text-sm font-medium transition-colors outline-none placeholder:text-lg placeholder:leading-6 placeholder:font-bold placeholder:uppercase',
                          values.recipeName ? 'text-main' : 'text-grey',
                          touched.recipeName && errors.recipeName && 'text-error'
                        )}
                      />
                    </div>
                    {touched.recipeName && errors.recipeName && (
                      <p className="mt-1 text-sm text-red-600">{errors.recipeName}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-col gap-4">
                      <TextField
                        id="description"
                        name="description"
                        placeholder="Enter a description of the dish"
                        value={values.description}
                        onChange={(v) => setFieldValue('description', v)}
                        onBlur={() => setFieldTouched('description')}
                        maxLength={200}
                        error={!!(touched.description && errors.description)}
                      />
                    </div>
                    {touched.description && errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </section>

                {/* Category + Cook time + Area + Ingredients */}
                <section
                  className="tablet:gap-14 flex flex-col gap-5"
                  aria-labelledby="category-heading"
                >
                  <div className="tablet:flex-row tablet:gap-5 flex flex-col gap-5">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <label
                        id="category-heading"
                        className="text-main text-lg font-extrabold uppercase"
                      >
                        Category
                      </label>
                      <Select
                        name="category"
                        options={categoryOptions}
                        value={values.category}
                        onChange={(opt) => {
                          const newValue = opt?.value ?? '';
                          setFieldValue('category', newValue);
                          setFieldTouched('category', true);
                          validateForm({ ...values, category: newValue });
                        }}
                        placeholder="Select category"
                        error={!!(touched.category && errors.category)}
                      />
                      {touched.category && errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div className="tablet:max-w-[194px] flex min-w-0 flex-shrink-0 flex-col gap-2">
                      <label
                        htmlFor="cook-time"
                        className="text-main text-lg font-extrabold uppercase"
                      >
                        Cooking time
                      </label>
                      <div
                        id="cook-time"
                        className={cn(
                          'flex items-center gap-3 transition-colors',
                          touched.cookTime &&
                            errors.cookTime &&
                            'rounded-[1.875rem] shadow-[inset_0_0_0_2px_var(--color-error)]'
                        )}
                        role="group"
                        aria-label="Cooking time in minutes"
                      >
                        <Button
                          type="button"
                          variant="icon"
                          iconName="minus-icon"
                          iconClass="w-4 h-4"
                          onClick={() =>
                            setFieldValue(
                              'cookTime',
                              Math.max(COOK_TIME_MIN, values.cookTime - COOK_TIME_STEP)
                            )
                          }
                          disabled={values.cookTime <= COOK_TIME_MIN}
                          className="tablet:h-14 tablet:w-14 h-12 w-12 shrink-0"
                          iconVisualHiddenText="Decrease cooking time"
                        />
                        <span className="text-main tablet:text-base min-w-[3rem] text-center text-sm font-medium">
                          {values.cookTime} min
                        </span>
                        <Button
                          type="button"
                          variant="icon"
                          iconName="plus-icon"
                          iconClass="w-4 h-4"
                          onClick={() =>
                            setFieldValue(
                              'cookTime',
                              Math.min(COOK_TIME_MAX, values.cookTime + COOK_TIME_STEP)
                            )
                          }
                          disabled={values.cookTime >= COOK_TIME_MAX}
                          className="tablet:h-14 tablet:w-14 h-12 w-12 shrink-0"
                          iconVisualHiddenText="Increase cooking time"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="area" className="text-main text-lg font-extrabold uppercase">
                      Area
                    </label>
                    <Select
                      name="area"
                      options={areaOptions}
                      value={values.area}
                      onChange={(opt) => {
                        const newValue = opt?.value ?? '';
                        setFieldValue('area', newValue);
                        setFieldTouched('area', true);
                        validateForm({ ...values, area: newValue });
                      }}
                      placeholder="Select area"
                      error={!!(touched.area && errors.area)}
                    />
                    {touched.area && errors.area && (
                      <p className="mt-1 text-sm text-red-600">{errors.area}</p>
                    )}
                  </div>

                  <div className="tablet:gap-10 flex flex-col gap-10">
                    <div className="tablet:flex-row tablet:items-end tablet:gap-5 flex flex-col gap-5">
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <label
                          htmlFor="ingredient"
                          className="text-main text-lg font-extrabold uppercase"
                        >
                          Ingredients
                        </label>
                        <Select
                          name="ingredient"
                          options={ingredientOptions}
                          value={values.selectedIngredient}
                          onChange={(opt) => setFieldValue('selectedIngredient', opt?.value ?? '')}
                          placeholder="Select ingredient"
                          searchable
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <TextField
                          id="measure"
                          placeholder="Enter quantity"
                          value={values.measure}
                          onChange={(v) => setFieldValue('measure', v)}
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="dark"
                      iconName="plus-icon"
                      iconClass="w-4 h-4"
                      onClick={handleAddIngredient}
                      iconVisualHiddenText="Add ingredient"
                      className="flex items-center gap-2"
                      disabled={!values.selectedIngredient?.trim() || !values.measure?.trim()}
                    >
                      Add ingredient
                    </Button>

                    {values.ingredientsList.length > 0 && (
                      <div
                        className="flex flex-wrap gap-4"
                        role="list"
                        aria-label="Added ingredients"
                      >
                        {values.ingredientsList.map((item) => (
                          <IngredientChip
                            key={item.id}
                            name={item.name}
                            measure={item.measure}
                            image={item.image}
                            onRemove={() => handleRemoveIngredient(item.id)}
                          />
                        ))}
                      </div>
                    )}
                    {touched.ingredientsList && errors.ingredientsList && (
                      <p className="text-error text-sm">{errors.ingredientsList}</p>
                    )}
                  </div>
                </section>

                {/* Recipe Preparation */}
                <section>
                  <div
                    className="tablet:gap-10 mt-10 flex flex-col gap-8"
                    aria-labelledby="preparation-heading"
                  >
                    <h2
                      id="preparation-heading"
                      className="text-main text-lg font-extrabold uppercase"
                    >
                      Recipe Preparation
                    </h2>
                    <TextField
                      name="recipePreparation"
                      placeholder="Enter recipe"
                      value={values.recipePreparation}
                      onChange={(v) => setFieldValue('recipePreparation', v)}
                      onBlur={() => setFieldTouched('recipePreparation')}
                      maxLength={1000}
                      multiline
                      error={!!(touched.recipePreparation && errors.recipePreparation)}
                    />
                  </div>
                  {touched.recipePreparation && errors.recipePreparation && (
                    <p className="mt-1 text-sm text-red-600">{errors.recipePreparation}</p>
                  )}
                </section>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="icon"
                    iconName="trash-icon"
                    iconClass="w-4 tablet:w-4.5 h-4 tablet:h-4.5"
                    onClick={handleClearForm}
                    className="tablet:h-14 tablet:w-14 h-12 w-12 shrink-0"
                    iconVisualHiddenText="Clear form"
                  />
                  <Button variant="dark" type="submit" disabled={isSubmitting}>
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
