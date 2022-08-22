import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, Input, Row, Col } from "reactstrap";
import { useState } from "react";

export default function Iterator(args) {
  const [dummy, setDummy] = useState({ heading: "", data: [""] });

  const [tasks, setTasks] = useState([]);
  const [updaterepeater, setupdaterepeater] = useState({
    title: "",
    list: [""],
  });
  const [updateindex, setupdateindex] = useState(0);

  const Add = () => {
    const clone = JSON.parse(JSON.stringify(dummy));
    clone.data.push("");
    setDummy(clone);
  };

  const remove = (index) => {
    const clone = JSON.parse(JSON.stringify(dummy));
    clone.data.splice(index, 1);
    console.log(clone);
    setDummy(clone);
  };

  const handleOnChangeHeading = (event) => {
    const clone = JSON.parse(JSON.stringify(dummy));
    clone.heading = event.target.value;
    setDummy(clone);
  };

  const handleOnChangeTask = (event, index) => {
    const clone = JSON.parse(JSON.stringify(dummy));
    clone.data[index] = event.target.value;
    setDummy(clone);
  };

  const updateOnChangeHeading = (event) => {
    const clone = JSON.parse(JSON.stringify(updaterepeater));
    clone.heading = event.target.value;
    setupdaterepeater(clone);
  };

  const updateOnChangeTask = (event, index) => {
    const clone = JSON.parse(JSON.stringify(updaterepeater));
    clone.list[index] = event.target.value;
    setupdaterepeater(clone);
  };

  const update = (index, value) => {
    setupdateindex(index);
    setupdaterepeater(value);
    toggle();
  };
  const updateAdd = () => {
    const clone = JSON.parse(JSON.stringify(updaterepeater));
    clone.list.push("");
    setupdaterepeater(clone);
  };

  const updatesub = (index) => {
    const clone = JSON.parse(JSON.stringify(updaterepeater));
    clone.list.splice(index, 1);
    setupdaterepeater(clone);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const stop = (e) => {
    e.preventDefault();

    console.log(dummy.heading);
    console.log(dummy.data);
    console.log(tasks);
    setTasks([
      ...tasks,
      {
        title: dummy.heading,
        list: dummy.data,
      },
    ]);
    setDummy({
      heading: "",
      data: [""],
    });
    console.log(tasks);
  };
  function deleteTask(index) {
    var clonedTasks = [...tasks];

    clonedTasks.splice(index, 1);

    setTasks(clonedTasks);
  }

  const updateStop = (e) => {
    e.preventDefault();

    var clonedTasks = [...tasks];

    clonedTasks[updateindex] = {
      ...tasks[updateindex],
      title: updaterepeater.title,
      list: updaterepeater.list,
    };
    setTasks(clonedTasks);
    toggle();
  };
  return (
    <>
      <div className="container mt-3">
        <h4>Title</h4>
        <Form onSubmit={stop}>
          <Row>
            <Col md={5}>
              <Input
                onChange={(event) => handleOnChangeHeading(event)}
                name="data"
                placeholder="Enter Your Heading"
                type="text"
                value={dummy.heading}
                required
              />
            </Col>
          </Row>
          <h4 className="mt-3">Sub Tasks</h4>
          {dummy.data.map((value, index) => (
            <Row key={index}>
              <Col md={5}>
                <Input
                  className="my-3"
                  onChange={(event) => handleOnChangeTask(event, index)}
                  name="data"
                  placeholder="Enter Your Task"
                  type="text"
                  value={value}
                  required
                />
              </Col>
              <Col md={1}>
                <button className="btn btn-warning my-3" onClick={() => Add()}>
                  +
                </button>
              </Col>
              <Col md={1}>
                {index !== 0 && (
                  <button
                    className=" btn btn-danger my-3"
                    onClick={() => remove(index)}
                  >
                    -
                  </button>
                )}
              </Col>
            </Row>
          ))}
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </Form>

        {tasks.map((val, ind) => (
          <div className="border border-danger p-2 my-4" key={ind}>
            <h4>{val.title}</h4>
            <ul>
              {val.list.map((val, ind) => (
                <div key={ind}>
                  <li>{val}</li>
                </div>
              ))}
              <button
                className="btn btn-danger  mt-3"
                onClick={() => deleteTask(ind)}
              >
                Delete
              </button>
              <button
                onClick={() => update(ind, val)}
                className="btn btn-warning  ms-2 mt-3"
              >
                Update{" "}
              </button>
            </ul>
            <div></div>
          </div>
        ))}

        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Update</ModalHeader>
          <ModalBody>
            <h4>Title</h4>
            <Form>
              <input
                onChange={(event) => updateOnChangeHeading(event)}
                defaultValue={updaterepeater.title}
                name="data"
                placeholder="Enter Your Heading"
                type="text"
                required
              />

              <h4>Sub Tasks</h4>

              {updaterepeater.list.map((value, place) => (
                <div key={place}>
                  <input
                    onChange={(event) => updateOnChangeTask(event, place)}
                    className="mt-3"
                    name="task"
                    defaultValue={value}
                    type="text"
                    required
                  />

                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => updateAdd()}
                  >
                    +
                  </button>

                  {place !== 0 && (
                    <button
                      className=" btn btn-danger ms-2"
                      onClick={() => updatesub(place)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button className="btn btn-warning mt-2" onClick={updateStop}>
                update
              </button>
            </Form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    </>
  );
}
