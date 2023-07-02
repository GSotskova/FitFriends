import { Controller, Get, Query, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { TrainingCatalogQuery} from '@project/shared/shared-query';
import { CheckAuthGuard } from './guards/check-auth.guard';



@Controller('training')
@UseFilters(AxiosExceptionFilter)
export class TrainingGeneralController {
  constructor(
    private readonly httpService: HttpService
  ) {}



  @UseGuards(CheckAuthGuard)
  @Get('catalog')
  public async showCatalog(@Query() query: TrainingCatalogQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/catalog`, {params : query});
   return data;
  }

}
