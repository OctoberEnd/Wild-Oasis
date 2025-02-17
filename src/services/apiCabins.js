import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // 判断是否传入的是已经存在的图片路径，或者需要生成新的文件路径
  const hasIamgePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 0、构建文件路径
  // url: https://rtgbkkmechabzrxtfaaw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasIamgePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit  如果传递了 id，则表示编辑已有的“Cabin”，并更新其数据
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // 1、创建cabin
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2、上传图片

  if (hasIamgePath) return data; // 在复制cabins时，防止多次上传
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3、删除cabin，如果图片上传失败
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin Image could not be uploaded, and Cabin was not created"
    );
  }
  return data;
}
