/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { useContext } from "react";
import ModalContext from "./ModalContext";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // function CreateCabinForm({ cabinToEdit = {} }) {
  //   const { close } = useContext(ModalContext); // 直接从 context 获取
  //   const onCloseModal = close;

  // 解构出 editId（判断是否编辑） 和其他数据（editValues）
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // register:绑定输入，自动处理值和验证
  // handleSubmit：用来处理表单提交的函数
  // reset：重置表单字段的值
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // console.log("Form registered fields:", register);
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // console.log(data);
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            // 表单提交完成后自动关闭窗口
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="cabin Name" error={errors?.name?.message}>
        {/* register方法将name字段与react-hook-form进行注册, */}
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "regularPrice should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* 如果按钮没有指定类型，默认会是 type="submit" */}
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
