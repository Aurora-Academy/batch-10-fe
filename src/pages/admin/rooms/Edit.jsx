import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { IMAGE_URL } from "../../../constants";
import imageNotFound from "../../../assets/img-not-found.png";

import {
  getRoomById,
  updateRoom,
  updateRoomStatus,
} from "../../../slices/roomSlice";

const AdminRoomEdit = () => {
  const { pathname = "" } = useLocation();
  const roomId = pathname.split("/")[3] ?? "";
  const dispatch = useDispatch();
  const { error, room } = useSelector((state) => state.rooms);
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    type: "",
    price: "",
    totalGuests: "",
    status: "",
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
    const d = await dispatch(updateRoom({ id: roomId, payload: formData }));
    if (d?.payload?.msg) {
      toast(d?.payload?.msg || "Something went wrong");
    }
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    const payload = {
      status: e.target.value,
    };
    const d = await dispatch(updateRoomStatus({ id: roomId, payload }));
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

  useEffect(() => {
    dispatch(getRoomById(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (Object.keys(room).length > 0) {
      setPayload(room);
      if (room.image) setPreview([`${IMAGE_URL}/rooms/${room?.image}`]);
    }
  }, [room]);

  return (
    <div className="col-md-9 m-5">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Edit room</h1>
        </div>
        <div>
          <Form.Select
            value={payload?.status}
            onChange={(e) => handleStatusChange(e)}
          >
            <option value="empty">Empty</option>
            <option value="booked">Booked</option>
            <option value="occupied">Occupied</option>
          </Form.Select>
        </div>
      </div>
      <div className="col-md-8 m-4">
        {error && <Notify msg={error} />}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            {preview && preview.length > 0 ? (
              <Image
                src={preview[0]}
                fluid
                style={{ maxHeight: "500px", maxWidth: "500px" }}
              />
            ) : (
              <Image
                src={imageNotFound}
                fluid
                style={{ maxHeight: "150px", maxWidth: "150px" }}
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
            <ButtonGroup className="me-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </ButtonGroup>
            <ButtonGroup>
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

export default AdminRoomEdit;
