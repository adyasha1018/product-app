/// <reference path="Reference.ts" />
declare module 'restangular' {
    export = restangular;
}
declare namespace restangular {
    interface IPromise<T> extends angular.IPromise<T> {
        call(methodName: string, params?: any): IPromise<T>;
        get(fieldName: string): IPromise<T>;
        $object: T;
    }
    interface IProvider {
        setBaseUrl(baseUrl: string): void;
        setExtraFields(fields: string[]): void;
        setParentless(parentless: boolean, routes: string[]): void;
        setDefaultHttpFields(httpFields: any): void;
        addElementTransformer(route: string, transformer: Function): void;
        addElementTransformer(route: string, isCollection: boolean, transformer: Function): void;
        setTransformOnlyServerElements(active: boolean): void;
        setOnElemRestangularized(callback: (elem: any, isCollection: boolean, what: string, restangular: any) => any): void;
        setResponseInterceptor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: any, deferred: angular.IDeferred<any>) => any): void;
        setResponseExtractor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: any, deferred: angular.IDeferred<any>) => any): void;
        addResponseInterceptor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: any, deferred: angular.IDeferred<any>) => any): void;
        setRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string) => any): void;
        addRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string) => any): void;
        setFullRequestInterceptor(fullRequestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any, httpConfig: angular.IRequestShortcutConfig) => { element: any; headers: any; params: any }): void;
        addFullRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any, httpConfig: angular.IRequestShortcutConfig) => { headers: any; params: any; element: any; httpConfig: angular.IRequestShortcutConfig }): void;
        setErrorInterceptor(errorInterceptor: (response: any, deferred: angular.IDeferred<any>, responseHandler: (response: any) => any) => any): void;
        setRestangularFields(fields: { [fieldName: string]: string }): void;
        setMethodOverriders(overriders: string[]): void;
        setJsonp(jsonp: boolean): void;
        setDefaultRequestParams(params: any): void;
        setDefaultRequestParams(method: string, params: any): void;
        setDefaultRequestParams(methods: string[], params: any): void;
        setFullResponse(fullResponse: boolean): void;
        setDefaultHeaders(headers: any): void;
        setRequestSuffix(suffix: string): void;
        setUseCannonicalId(useCannonicalId: boolean): void;
        setEncodeIds(encode: boolean): void;
    }
}