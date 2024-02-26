export class CreateReviewDto {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly rating: number;
  readonly productId: string;
}
