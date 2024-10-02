import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Notify } from "../../../components/Notify";

import { createRoom } from "../../../slices/roomSlice";

const Create = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.rooms);
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    type: "",
    price: "",
    totalGuests: "",
  });

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", payload?.name);
    formData.append("type", payload?.type);
    formData.append("price", payload?.price);
    formData.append("totalGuests", payload?.totalGuests);
    formData.append("image", images[0] ?? "");
    const d = await dispatch(createRoom(formData));
    if (d?.payload?.msg) {
      toast(d?.payload?.msg || "Something went wrong");
    }
  };

  useEffect(() => {
    setPreview([]);
    if (!images) {
      return;
    }
    images &&
      images.length > 0 &&
      images.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreview((prev) => {
          return [...prev, objectUrl];
        });
      });
  }, [images]);

  return (
    <div className="col-md-9 m-5">
      <h1>Add new Room</h1>
      <div className="col-md-8 m-4">
        {error && <Notify msg={error} />}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            {preview && preview.length > 0 && (
              <Image
                src={preview[0]}
                fluid
                style={{ maxHeight: "500px", maxWidth: "500px" }}
              />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Room Image</Form.Label>
            <Form.Control type="file" onChange={(e) => handleImage(e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: Presidential Suite"
              value={payload?.name}
              onChange={(e) =>
                setPayload((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={payload?.type}
              onChange={(e) =>
                setPayload((prev) => {
                  return { ...prev, type: e.target.value };
                })
              }
            >
              <option value="">Select room type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price/night</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg: 10000"
              value={payload?.price}
              onChange={(e) =>
                setPayload((prev) => {
                  return { ...prev, price: Number(e.target.value) };
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Guest Numbers</Form.Label>
            <Form.Select
              value={payload?.totalGuests}
              onChange={(e) =>
                setPayload((prev) => {
                  return { ...prev, totalGuests: Number(e.target.value) };
                })
              }
            >
              <option value="">Select total guests number</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </Form.Select>
          </Form.Group>
          <ButtonToolbar>
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </ButtonGroup>
            <ButtonGroup aria-label="Third group">
              <Link to="/admin/rooms" className="btn btn-danger">
                Go Back
              </Link>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
      </div>
    </div>
  );
};

export default Create;
