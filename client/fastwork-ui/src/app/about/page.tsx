import React from "react";
import "flowbite";
import "flowbite/dist/flowbite.css";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("AboutPage");
  return (
    <div className="p-16">
      <div className="flex flex-col items-center md:flex-row md:w-full mb-16">
        <div className="flex flex-col justify-between leading-normal w-full">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("who_are_we")}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            {t("description")}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            {t("description_two")}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
            {t("shopping_services")}
          </p>
        </div>
      </div>

      <section className="dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Offering services?</h3>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("ask_needs")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("understand_employer")}
              </li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("build_proposal")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("select_skills")}
              </li>
              <li>
                {t("highlight_work")}
              </li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("collaborate_effectively")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("maintain_communication")}
              </li>
              <li>
                {t("provide_updates")}
              </li>
              <li>
                {t("release_payment")}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {t("looking_for_services")}
            </h3>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("ask_experience")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("understand_background")}
              </li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("buy_service")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("make_payment")}
              </li>
            </ul>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-justify">
              {t("collaborate_effectively")}
            </p>
            <ul className="list-disc ml-5 mb-4 text-gray-700 dark:text-gray-400">
              <li>
                {t("when_you_approve")}
              </li>
              <li>
                {t("respond_in_48")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900 mx-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {t("simple_isnt_it")}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            {t("register_now")}
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="/findServices"
              className="py-2 px-4 sm:ms-4 text-sm font-medium text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]"
            >
              {t("findService")}
            </a>
            <a
              href="/offerServices"
              className="py-2 px-4 sm:ms-4 text-sm font-medium text-white bg-[#0B2147] rounded-lg hover:bg-[#D0693B] focus:z-10 focus:ring-4 focus:ring-[#D0693B] dark:focus:ring-[#D0693B]"
            >
              {t("offerService")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;





