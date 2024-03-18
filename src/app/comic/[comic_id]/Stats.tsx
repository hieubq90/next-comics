import { Icon } from '~/components/commons/Icon'

const Stats = ({ total_views, followers }: { total_views: String; followers: String }) => {
  return (
    <div className="flex items-center flex-wrap font-bold text-gray-800 gap-x-4 gap-y-1">
      <span className="flex items-center gap-1">
        <Icon
          name="radix/eye-open"
          className="text-sky-500 text-[20px]"
        />
        {total_views === 'Updating' ? 'Đang cập nhật' : total_views.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <Icon
          name="radix/heart"
          className="text-rose-500 text-[20px]"
        />
        {followers === 'Updating' ? 'Đang cập nhật' : followers.toLocaleString()}
      </span>
    </div>
  )
}

export default Stats
