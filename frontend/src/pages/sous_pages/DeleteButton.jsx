import axios from "axios";
import "./DeleteButton.css";

export default function DeleteButton({ id, setRefresh }) {
  const handleDelete = () => {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm("Are you sure to delete him ?");
      if (result) {
        axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/api/bagpokemons/${id}`)
          .then(() => {
            setRefresh();
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="button_delete" type="button" onClick={handleDelete}>
      <span className="span_delete">x</span>
    </button>
  );
}
