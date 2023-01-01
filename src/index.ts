import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { RouteResponse } from "./types/RouteResponse";
import { BaseResponse } from "./types/BaseResponse";
import { Options } from "./types/Options";
import { doesConformToZod } from "./utils/doesConformToZod";
import { AuthRequest } from "./validators/AuthRequest";
import { GetItemsOptions } from "./validators/GetItemsOptions";
import { WriteItemRequest, WriteFeedOrGroupRequest } from "./validators/WriteRequest";
import { favicons } from "./routes/favicons";
import { feeds } from "./routes/feeds";
import { getSavedItems } from "./routes/getSavedItems";
import { getUnreadItems } from "./routes/getUnreadItems";
import { groups } from "./routes/groups";
import { items } from "./routes/items";
import { writeFeedOrGroup } from "./routes/writeFeedOrGroup";
import { writeItem } from "./routes/writeItem";

const API_VERSION = 3;

export const fever = (options: Options) =>
  asyncErrorHandler(async (req: Request, res: Response) => {
    const maybeAuthRequest = AuthRequest.safeParse(req.body);
    if (!maybeAuthRequest.success || !options.authenticateUser(maybeAuthRequest.data.api_key)) {
      return makeResponse(res, { api_version: API_VERSION, auth: 0 });
    }

    const { query, body } = req;

    const responsesPromises: Array<Promise<RouteResponse | BaseResponse>> = [getBaseResponse(options)];
    const isQueryParameterPresent = (property: string) => doesConformToZod(z.string(), query[property]);

    if (isQueryParameterPresent("feeds")) {
      responsesPromises.push(feeds(options));
    }

    if (isQueryParameterPresent("favicons")) {
      responsesPromises.push(favicons(options));
    }

    if (isQueryParameterPresent("groups")) {
      responsesPromises.push(groups(options));
    }

    if (isQueryParameterPresent("items")) {
      const getItemsOptions = GetItemsOptions.parse(query);

      responsesPromises.push(items(options, getItemsOptions));
    }

    if (isQueryParameterPresent("unread_item_ids")) {
      responsesPromises.push(getUnreadItems(options));
    }

    if (isQueryParameterPresent("saved_item_ids")) {
      responsesPromises.push(getSavedItems(options));
    }

    const maybeBodyAsWriteItemRequest = WriteItemRequest.safeParse(body);
    if (maybeBodyAsWriteItemRequest.success) {
      responsesPromises.push(writeItem(options, maybeBodyAsWriteItemRequest.data));
    }

    const maybeBodyAsWriteFeedOrGroupRequest = WriteFeedOrGroupRequest.safeParse(body);
    if (maybeBodyAsWriteFeedOrGroupRequest.success) {
      responsesPromises.push(writeFeedOrGroup(options, maybeBodyAsWriteFeedOrGroupRequest.data));
    }

    const responses = await Promise.all(responsesPromises);
    const response = responses.reduce<RouteResponse & BaseResponse>(
      (acc, response) => ({ ...acc, ...response }),
      {} as BaseResponse
    );

    return makeResponse(res, response);
  });

function makeResponse(res: Response, data: BaseResponse) {
  return res.json(data);
}

async function getBaseResponse(options: Options): Promise<BaseResponse> {
  const lastRefreshedOnTimeDate = await options.getLastRefreshedOnTime();
  const lastRefreshedOnTime = lastRefreshedOnTimeDate.getTime() / 1000;
  return {
    api_version: API_VERSION,
    auth: 1,
    last_refreshed_on_time: lastRefreshedOnTime,
  };
}

function asyncErrorHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
