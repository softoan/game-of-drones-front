import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Success = (title: string, message: string) => {
  const isMobile = window.innerWidth < 600;
  const titleSize = isMobile ? "18px" : "22px";
  const messageSize = isMobile ? "14px" : "16px";

  MySwal.fire({
    title: `<div style="font-size:${titleSize}; font-weight:bold; color:#1E3A8A;">${title}</div>`,
    html: `<div style="font-size:${messageSize}; color:#374151;">${message}</div>`,
    icon: "success",
    background: "#f9fafb",
    color: "#111827",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
    didOpen: () => {
      const swalContainer = document.querySelector(".swal2-container") as HTMLElement | null;
      if (swalContainer) {
        swalContainer.style.zIndex = "999999";
        swalContainer.style.position = "fixed";
        swalContainer.style.top = "1rem";
        swalContainer.style.right = "1rem";
        swalContainer.style.width = isMobile ? "80%" : "350px";
        swalContainer.style.maxWidth = "90%";
      }
    },
  });
};

export const Error = (title: string, message: string) => {
  Swal.fire({
    icon: "error",
    title: title || "Oops...",
    text: message,
    confirmButtonText: "Ok",
    customClass: {
      container: "bg-swee",
      confirmButton: "custom-ok-button",
    }
  });

};

export const Warning = (title: string, message: string) => {
  MySwal.fire({
    title: title || "Oops...",
    text: message,
    icon: "warning",
    confirmButtonText: "Entendido",
    customClass: {
      container: "buggi-swee",
      confirmButton: "custom-ok-button",
    }
  });
};

export const ConfirmDelete = (
  title: string,
  id: string,
  onDelete: (id: string) => void
) => {
  MySwal.fire({
    title: `<p style="font-size:22px;">${title}</p>`,
    icon: "warning",              // 🔹 Muestra advertencia
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#d33",   // 🔹 Rojo para el botón eliminar
    cancelButtonText: "Cancelar",
    customClass: {
      container: "buggi-swee",
      confirmButton: "custom-ok-button",
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      await onDelete(id);
    }
  });
};

