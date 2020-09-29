import { delay } from '../common/util/util';
import { sampleData } from '../api/sampleData';

export function fetchSampleData() {
	return delay(1000).then(function () {
		return Promise.resolve(sampleData);
	});
}
