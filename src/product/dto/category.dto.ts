export class CategoryDto {
  _id: string;
  name: string;
  meaning: {
    KZ: string;
    RU: string;
    EN: string;
  };
  attribute: CategoryAttributeDto[];
}

export class CategoryAttributeDto {
  _id: string;
  value: {
    RU: string;
    EN: string;
    KZ: string;
  };
}
