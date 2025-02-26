import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Module } from '@ringcentral-integration/commons/lib/di';

@Module({
  name: 'AppFeatures',
  deps: [
    { dep: 'RolesAndPermissionsOptions', optional: true }
  ]
})
export default class NewAppFeatures extends AppFeatures {
  get ringtonePermission() {
    return !!this.config.RingtoneSettings;
  }

  get hasMeetingsPermission() {
    return (
      super.hasMeetingsPermission &&
      this.appScopes.indexOf('Meetings') > -1
    )
  }

  get appScopes() {
    return (
      this._deps.auth.token &&
      this._deps.auth.token.scope
    ) || '';
  }

  get hasGlipPermission() {
    return (
      super.hasGlipPermission && (
        this.appScopes.indexOf('Glip') > -1 ||
        this.appScopes.indexOf('TeamMessaging') > -1
      )
    );
  }
}
