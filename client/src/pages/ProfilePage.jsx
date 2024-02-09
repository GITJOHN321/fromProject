import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/utilsScripts.js";
import { FaRegCheckCircle } from "react-icons/fa";

function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    user,
    changePasswordPerfil,
    errors: profileErrors,
    resetErrors,
    deleteUserFromProfile,
  } = useAuth();
  const [corret, setCorret] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    const change = await changePasswordPerfil(data);

    if (change) {
      alert("Password updated successfully");
      resetErrors();
      reset();
      setCorret(true);
    }
  });
  return (
    <div className="flex py-9 items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full py-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold head px-10 py-1 mb-2">Perfil</h1>
        <div className="px-10">
          <h2 className="text-2xl font-bold py-2 mb-2">
            Información de cuenta
          </h2>
          <div className="py-2">
            <SubtitlesForm subtitle={"Username"} text={user.username} />
            <SubtitlesForm
              subtitle={"Correo electrónico: "}
              text={user.email}
            />
            <SubtitlesForm
              subtitle={"Miembro desde: "}
              text={formatDate(user.date)}
            />
          </div>
          <hr />

          <div className="flex items-center">
            <h2 className="text-2xl font-bold py-2 mb-2 shrink-0">
              Cambiar Contraseña
            </h2>
            {corret ? <FaRegCheckCircle /> : null}
          </div>

          <form className="" onSubmit={onSubmit}>
            {profileErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white text-center" key={i}>
                {error}
              </div>
            ))}
            <label htmlFor="">CONTRASEÑA ACTUAL</label>
            <input
              type="password"
              {...register("old_password", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            <label htmlFor="">CONTRASEÑA NUEVA</label>
            <input
              type="password"
              {...register("new_password", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
            <label htmlFor="">REPITA LA CONTRASEÑA</label>
            <input
              type="password"
              {...register("new_password2", { required: true })}
              className="w-full input px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
            <br />

            <button
              type="submit"
              className=" p-2 my-4 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg"
            >
              {" "}
              Cambiar Contraseña{" "}
            </button>
          </form>
          <hr />
          <h2 className="text-2xl font-bold py-2 mb-2">Account deletion</h2>
          <div className="flex justify-between">
            <label className="font-bold">Account deletion </label>
            <Link
              className="text-red-500 end-0"
              onClick={() => {
                setIsDelete(true);
              }}
            >
              &nbsp; Delete my account
            </Link>
          </div>
          {isDelete && (
            <div className="mt-10">
              <hr />
              <label className="flex justify-center text-red-600 font-bold">
                ¿Seguro que desea eliminar la cuenta?
              </label>
              <div className="flex items-center justify-center text-center ">
                <button
                  className="w-full p-2 border-4 mx-4 my-2 border-red-800 text-red-800 bg-zinc-100 hover:bg-red-500  font-medium rounded-lg"
                  onClick={async () => {
                    await deleteUserFromProfile();
                  }}
                >
                  Si
                </button>
                <button
                  className="w-full p-2 mx-4 my-2 border-4 border-sky-800 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg"
                  onClick={() => {
                    setIsDelete(false);
                  }}
                >
                  No
                </button>
              </div>
              <label className="flex justify-center  text-center">
                Una vez eliminada la cuenta ya no la puedes recuperar!
              </label>
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

function SubtitlesForm(props) {
  return (
    <div className="grid grid-cols-2 py-1">
      <label className="font-bold">{props.subtitle} </label>
      <label className="">&nbsp; {props.text}</label>
    </div>
  );
}
