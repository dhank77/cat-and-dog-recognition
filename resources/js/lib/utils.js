import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}
export function formatDate(date) {
  if(date == null || date == undefined) return '';

  let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2) month = "0" + month;
   if (day.length < 2) day = "0" + day;

   return [day, bulan(month), year].join(" ");
}

export function bulan(bulan) {
  switch (bulan) {
    case "01":
      return "Januari"
    case "02":
      return "Februari"
    case "03":
      return "Maret"
    case "04":
      return "April"
    case "05":
      return "Mei"
    case "06":
      return "Juni"
    case "07":
      return "Juli"
    case "08":
      return "Agustus"
    case "09":
      return "September"
    case "10":
      return "Oktober"
    case "11":
      return "November"
    case "12":
      return "Desember"
  
    default:
      break;
  }
}

