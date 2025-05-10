import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './ShanWebPart.module.scss';

export interface IShanWebPartProps {
}

export default class ShanWebPart extends BaseClientSideWebPart<IShanWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.shan }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
