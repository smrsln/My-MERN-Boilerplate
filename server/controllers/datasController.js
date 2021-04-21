import express from "express";
import mongoose from "mongoose";

import DataModel from "../models/dataModel.js";

const router = express.Router();

export const getDatas = async (req, res) => {
  try {
    const datas = await DataModel.find();

    res.status(200).json(datas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await DataModel.findById(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createData = async (req, res) => {
  const data = req.body;

  const newData = new DataModel({
    ...data,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateData = async (req, res) => {
  const { id } = req.params;

  //point datas
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedData = { creator, title, message, tags, selectedFile, _id: id };

  await DataModel.findByIdAndUpdate(id, updatedData, { new: true });

  res.json(updatedData);
};

export const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await DataModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
