import { DetailedHTMLProps, HTMLAttributes } from "react";


 export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLParagraphElement> {
   productId: string;
   isOpened: boolean;
 }